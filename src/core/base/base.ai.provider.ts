import { AIContextDto } from "../../modules/chat/dto/chat.dtos";
import { AIMessage } from "../interfaces";



export abstract class BaseAIProvider {
    abstract generateResponse(messages: AIMessage[], context?: AIContextDto): Promise<string>;
    abstract generateStreamingResponse?(messages: AIMessage[], context?: AIContextDto): AsyncGenerator<string>;
}