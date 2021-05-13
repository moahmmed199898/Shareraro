export type Signal = {
    waitingCalls:Array<CallDocRef>
}

export type CallDocRef = {
    waitingCallDoc:boolean,
    callDocRef: string
}