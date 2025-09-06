import { injectable } from 'inversify';
import { AbstractViewContribution, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { SchedulerAssistantWidget } from './scheduler-assistant.widget';

export const SCHEDULER_ASSISTANT_VIEW_ID = 'scheduler-assistant';

@injectable()
export class SchedulerAssistantContribution
    extends AbstractViewContribution<SchedulerAssistantWidget>
    implements FrontendApplicationContribution {
    constructor() {
        super({
            widgetId: SCHEDULER_ASSISTANT_VIEW_ID,
            widgetName: 'Scheduler Assistant',
            defaultWidgetOptions: { area: 'left' },
            toggleCommandId: 'scheduler.assistant.toggle'
        });
    }
}

