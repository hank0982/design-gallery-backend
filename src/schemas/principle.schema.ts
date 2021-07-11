import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrincipleDocument = Principle & Document;

@Schema({ timestamps: true })
export class Principle {
    @Prop({
        type: 'String',
        default: 'default'
    })
    _id: string;
    @Prop({
        type: [{ type: 'String'}], default: ['Message', 'Audience', 'Theme', 'Decoration'],
    })
    APPROPRIATENESS: string[];
  
    @Prop({
        type: [{ type: 'String' }], default: ['Contrast', 'Noise']
    })
    EMPHASIS: string[];
  
    @Prop({
        type: [{ type: 'String'}], default: ['Placement', 'Margins', 'Gutters']
    })
    ALIGNMENT: string[];
  
    @Prop({
        type: [{ type: 'String' }], default: ['Visual flow', 'Focal points', 'Visual relationship']
    })
    HIERARCHY: string[];
  
    @Prop({
        type: [{ type: 'String', default: ['Repetition', 'Visual unity'] }], default: ['Visual flow', 'Focal points', 'Visual relationship']
    })
    CONSISTENCY: string[];
  
    @Prop({
        type: [{ type: 'String'}], default: ['Orphan', 'Widow', 'Line spacing', 'Kerning', 'Character width', 'Paragraph spacing', 'Justify text']
    })
    READABILITY: string[];
}

export const PrincipleSchema = SchemaFactory.createForClass(Principle);
