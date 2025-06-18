import { AIContextDto } from "../../integrations/openai/dtos/openai.dto";
import { AIMessage } from "../interfaces";

export abstract class BaseAIProvider {
    abstract generateResponse(messages: AIMessage[], context?: AIContextDto): Promise<string>;
    abstract generateStreamingResponse?(messages: AIMessage[], context?: AIContextDto): AsyncGenerator<string>;
}