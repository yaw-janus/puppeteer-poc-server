import { CommandMessage, StatusMessage } from "@hanseltime/janus-simple-command"

export type ServerCommands = 'ready'
export type ExtensionCommands = 'click' | 'fill' | 'wait'

export type ServerCommandMap = {
    ready: CommandMessage<'ready', {}>
}
export type ServerStatusMap = {
    ready: StatusMessage<{}>
}

export type ExtensionCommandMap = {
    click: CommandMessage<'click', {selector: string}>
    fill: CommandMessage<'fill', {selector: string}>
    wait: CommandMessage<'wait', {waitDelay: number}>
}

export type ExtensionStatusMap = {
    click: StatusMessage<{}, Error>
    fill: StatusMessage<{}, Error>
    wait: StatusMessage<{}, Error>
}