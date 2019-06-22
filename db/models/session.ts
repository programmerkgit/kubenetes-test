import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';
import User from './user';

@Scopes({
    user: {
        include: [ () => User ]
    }
})
@Table({
    timestamps: true,
    tableName: 'Sessions'
})
export default class Session extends Model<Session> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => User)
    @Column({type: DataType.UUIDV4, allowNull: false})
    userId: string;

    @BelongsTo(() => User)
    user: User;

}
