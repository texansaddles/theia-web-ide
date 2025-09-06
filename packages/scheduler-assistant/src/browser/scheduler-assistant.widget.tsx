import * as React from 'react';
import { injectable } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';

interface EventItem {
    id: string;
    title: string;
    when: string; // ISO datetime or natural text for now
    durationMins?: number;
}

const STORAGE_KEY = 'scheduler.events.v1';

function loadEvents(): EventItem[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) as EventItem[] : [];
    } catch {
        return [];
    }
}

function saveEvents(items: EventItem[]): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

@injectable()
export class SchedulerAssistantWidget extends ReactWidget {
    protected events: EventItem[] = loadEvents();

    protected doInit(): void {
        this.id = 'scheduler-assistant';
        this.title.label = 'Scheduler Assistant';
        this.title.caption = 'Scheduler Assistant';
        this.title.closable = true;
        this.update();
    }

    protected onAddQuick(): void {
        const title = prompt('Event title:');
        if (!title) return;
        const when = prompt('When (e.g., 2025-09-06 10:00):') || '';
        const item: EventItem = { id: String(Date.now()), title, when };
        this.events = [...this.events, item];
        saveEvents(this.events);
        this.update();
    }

    protected onDelete(id: string): void {
        this.events = this.events.filter(e => e.id !== id);
        saveEvents(this.events);
        this.update();
    }

    render(): React.ReactNode {
        return (
            <div className='theia-widget-container' style={{ padding: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <button className='theia-button secondary' onClick={() => this.onAddQuick()}>Add Event</button>
                    <span style={{ opacity: 0.7 }}>v1: local-only; backend & AI coming next</span>
                </div>
                {this.events.length === 0 ? (
                    <div style={{ opacity: 0.7 }}>No events yet. Click "Add Event" to begin.</div>
                ) : (
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        {this.events.map(e => (
                            <li key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--theia-ui-font-color3)' }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{e.title}</div>
                                    <div style={{ fontSize: 12, opacity: 0.8 }}>{e.when}</div>
                                </div>
                                <button className='theia-button danger' onClick={() => this.onDelete(e.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

