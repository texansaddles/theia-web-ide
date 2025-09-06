import { ContainerModule } from 'inversify';
import { bindViewContribution, WidgetFactory } from '@theia/core/lib/browser/shell/view-contribution';
import { SchedulerAssistantContribution, SCHEDULER_ASSISTANT_VIEW_ID } from './scheduler-assistant.contribution';
import { SchedulerAssistantWidget } from './scheduler-assistant.widget';

export default new ContainerModule(bind => {
    bindViewContribution(bind, SchedulerAssistantContribution);
    bind(SchedulerAssistantWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: SCHEDULER_ASSISTANT_VIEW_ID,
        createWidget: () => ctx.container.get(SchedulerAssistantWidget)
    }));
});

