#!/usr/bin/env python3
"""
Git Arbeitszeit Rechner
Berechnet die Arbeitszeit basierend auf Git-Commits
"""

import subprocess
import sys
from datetime import datetime, timedelta
from collections import defaultdict

def get_git_commits():
    """Holt alle Git-Commits mit Timestamps"""
    try:
        # Git log mit Timestamp und Author abrufen
        result = subprocess.run(
            ['git', 'log', '--pretty=format:%ai|%an|%s', '--all'],
            capture_output=True,
            text=True,
            check=True
        )
        
        commits = []
        for line in result.stdout.strip().split('\n'):
            if line:
                parts = line.split('|')
                if len(parts) >= 3:
                    timestamp_str = parts[0]
                    author = parts[1]
                    message = parts[2]
                    
                    # Parse timestamp
                    timestamp = datetime.strptime(timestamp_str.split('+')[0].strip(), '%Y-%m-%d %H:%M:%S')
                    commits.append({
                        'timestamp': timestamp,
                        'author': author,
                        'message': message
                    })
        
        return sorted(commits, key=lambda x: x['timestamp'])
    
    except subprocess.CalledProcessError as e:
        print(f"Fehler beim Abrufen der Git-Commits: {e}")
        return []
    except Exception as e:
        print(f"Fehler: {e}")
        return []

def calculate_work_time(commits, max_gap_minutes=120):
    """
    Berechnet die Arbeitszeit basierend auf Commits
    
    Args:
        commits: Liste von Commits
        max_gap_minutes: Maximale Pause zwischen Commits (Standard: 120 Minuten)
    """
    if not commits:
        print("Keine Commits gefunden!")
        return
    
    print("=" * 80)
    print("GIT ARBEITSZEIT ANALYSE")
    print("=" * 80)
    print(f"\nAnzahl Commits: {len(commits)}")
    print(f"Erster Commit: {commits[0]['timestamp'].strftime('%d.%m.%Y %H:%M:%S')}")
    print(f"Letzter Commit: {commits[-1]['timestamp'].strftime('%d.%m.%Y %H:%M:%S')}")
    print(f"Maximale Pause zwischen Sessions: {max_gap_minutes} Minuten")
    print("\n" + "=" * 80)
    
    # Arbeitszeit nach Tag gruppieren
    work_by_day = defaultdict(lambda: {'duration': timedelta(), 'commits': 0, 'sessions': []})
    
    total_work_time = timedelta()
    session_start = commits[0]['timestamp']
    current_session = timedelta()
    session_commits = 1
    
    for i in range(1, len(commits)):
        prev_commit = commits[i - 1]
        current_commit = commits[i]
        
        time_diff = current_commit['timestamp'] - prev_commit['timestamp']
        
        # Wenn die Lücke kleiner als max_gap ist, zählen wir es als aktive Arbeitszeit
        if time_diff.total_seconds() / 60 <= max_gap_minutes:
            current_session += time_diff
            session_commits += 1
        else:
            # Session beendet, neue Session beginnt
            # Füge 10 Minuten für den letzten Commit der Session hinzu
            current_session += timedelta(minutes=10)
            total_work_time += current_session
            
            # Nach Tag gruppieren
            day_key = session_start.strftime('%Y-%m-%d')
            work_by_day[day_key]['duration'] += current_session
            work_by_day[day_key]['commits'] += session_commits
            work_by_day[day_key]['sessions'].append({
                'start': session_start,
                'end': prev_commit['timestamp'],
                'duration': current_session,
                'commits': session_commits
            })
            
            # Neue Session starten
            session_start = current_commit['timestamp']
            current_session = timedelta()
            session_commits = 1
    
    # Letzte Session hinzufügen
    current_session += timedelta(minutes=10)
    total_work_time += current_session
    day_key = session_start.strftime('%Y-%m-%d')
    work_by_day[day_key]['duration'] += current_session
    work_by_day[day_key]['commits'] += session_commits
    work_by_day[day_key]['sessions'].append({
        'start': session_start,
        'end': commits[-1]['timestamp'],
        'duration': current_session,
        'commits': session_commits
    })
    
    # Ausgabe nach Tag
    print("\nARBEITSZEIT PRO TAG:")
    print("-" * 80)
    
    for day in sorted(work_by_day.keys()):
        data = work_by_day[day]
        duration = data['duration']
        hours = duration.total_seconds() / 3600
        
        day_formatted = datetime.strptime(day, '%Y-%m-%d').strftime('%d.%m.%Y')
        print(f"\n📅 {day_formatted}")
        print(f"   Arbeitszeit: {int(hours)}h {int((hours % 1) * 60)}m")
        print(f"   Commits: {data['commits']}")
        print(f"   Sessions: {len(data['sessions'])}")
        
        for j, session in enumerate(data['sessions'], 1):
            sess_hours = session['duration'].total_seconds() / 3600
            print(f"      Session {j}: {session['start'].strftime('%H:%M')} - {session['end'].strftime('%H:%M')} "
                  f"({int(sess_hours)}h {int((sess_hours % 1) * 60)}m, {session['commits']} Commits)")
    
    # Gesamtstatistik
    print("\n" + "=" * 80)
    print("GESAMT STATISTIK")
    print("=" * 80)
    
    total_hours = total_work_time.total_seconds() / 3600
    print(f"\n⏱️  Gesamte Arbeitszeit: {int(total_hours)}h {int((total_hours % 1) * 60)}m")
    print(f"📊 Durchschnitt pro Tag: {total_hours / len(work_by_day):.1f}h")
    print(f"📝 Commits pro Stunde: {len(commits) / total_hours:.1f}")
    
    # Zeitspanne
    project_span = commits[-1]['timestamp'] - commits[0]['timestamp']
    span_days = project_span.days
    print(f"📆 Projektdauer: {span_days} Tage")
    
    # Authors
    authors = defaultdict(int)
    for commit in commits:
        authors[commit['author']] += 1
    
    print(f"\n👥 Beteiligte Personen: {len(authors)}")
    for author, count in sorted(authors.items(), key=lambda x: x[1], reverse=True):
        print(f"   - {author}: {count} Commits ({count/len(commits)*100:.1f}%)")
    
    print("\n" + "=" * 80)

def main():
    """Hauptfunktion"""
    print("\n🔍 Analysiere Git-Repository...\n")
    
    commits = get_git_commits()
    
    if commits:
        # Standard: 120 Minuten Pause zwischen Sessions
        calculate_work_time(commits, max_gap_minutes=120)
        
        # Alternative Ansicht mit kürzeren Pausen
        print("\n\n" + "=" * 80)
        print("ALTERNATIVE BERECHNUNG (60 Minuten Pause)")
        print("=" * 80)
        calculate_work_time(commits, max_gap_minutes=60)
    else:
        print("Keine Commits im Repository gefunden!")
        print("Stelle sicher, dass du dich im richtigen Git-Repository befindest.")
        sys.exit(1)

if __name__ == "__main__":
    main()
