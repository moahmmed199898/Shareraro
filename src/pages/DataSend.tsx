import React, { ChangeEvent } from "react";
import Answerer from "../Services/PC/DataShare/Answerer";
import DataSender from "../Services/PC/DataShare/Sender";
export default class DataSend extends React.Component {

    async onclickHandler():Promise<void> {
        // const dataSender = new DataSender();
        // const callID = await dataSender.call();
        // await new Answerer().answer(callID);

    }

    async onFile(event:ChangeEvent<HTMLInputElement>):Promise<void> {
        const target = event.target as HTMLInputElement;
        const file = target.files[0];
        

        const dataSender = new DataSender();
        const callID = await dataSender.call(file);
        await new Answerer().answer(callID);

    }
    
    render():JSX.Element {
       return (
           <div>
                <button onClick={this.onclickHandler.bind(this)}>Click me</button>
                <input onChange={(e)=>this.onFile(e)} type="file"></input>
            </div>
       ) 
    }
}