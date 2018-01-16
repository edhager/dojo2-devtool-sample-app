import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';

import { TodoViewSwitch } from './TodoViewSwitch';
import { TodoFilter } from './TodoFilter';

import * as css from './styles/todoFooter.m.css';

export interface TodoFooterInterface {
	activeCount: number;
	filter: string;
	todoCount: number;
	view: string;
	clearCompleted: () => void;
}

export const TodoFooterBase = I18nMixin(ThemedMixin(WidgetBase));

@theme(css)
export class TodoFooter extends TodoFooterBase<TodoFooterInterface> {

	protected clearCompleted(): void {
		this.properties.clearCompleted();
	}

	protected render(): DNode {
		const { filter, view, activeCount, todoCount } = this.properties;
		const completedItems = (todoCount - activeCount) > 0;
		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.theme(css.footer)
		}, [
			v('span', { classes: this.theme(css.todoCount) }, [
				v('strong', [activeCount + ' ']),
				v('span', [ messages.format('itemsLeft', { count: activeCount }) ])
			]),
			w(TodoFilter, { filter }),
			w(TodoViewSwitch, { view }),
			completedItems ? v('button', {
				onclick: this.clearCompleted,
				classes: this.theme(css.clearCompleted)
			}, [ messages.clearButtonText ]) : null
		]);
	}
}
