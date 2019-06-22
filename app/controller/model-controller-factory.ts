import { RequestHandler } from 'express';
import { ConnectionError, ValidationError } from 'sequelize';
import { NextFunction, Request, Response } from 'express-serve-static-core';

const path = require('path');

export class CrudFactory {
    model;

    constructor(model) {
        this.model = model;
    }

    findAll: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const options = req.query || {};
        const scopes = options.scopes || [];
        const connector = scopes.length ? this.model.scope(scopes) : this.model;
        connector.findAll(options).then(instances => {
            res.json(instances);
        }).catch(error => {
            console.log(error);
            next(error);
        });
    };

    create: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const options = req.query || {};
        const values = req.body || {};
        console.log(values,  'create')
        this.model.create(values, options).then(instance => {
            res.status(201);
            res.header('Location', path.join('/api', this.model.tableName.toLowerCase(), instance.id.toString()));
            res.json(instance);
        }).catch(ConnectionError, error => {
            /* ValidationError ETC */
            console.error(error);
            res.sendStatus(503);
        }).catch(ValidationError, error => {
            console.error(error);
            res.sendStatus(403);
        }).catch(next);
    };

    delete: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        this.model.findById(id).then(instance => {
            if (instance) {
                instance.destroy().then(() => {
                    /* Should Not Show Updated Fields */
                    res.end();
                }).catch(next);
            } else {
                res.sendStatus(404);
            }
        }).catch(ValidationError, error => {
            console.error(error);
            res.sendStatus(403);
        });
    };

    findById: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const options = req.query || {};
        const scopes = options.scopes || [];
        const connector = scopes.length ? this.model.scope(scopes) : this.model;
        connector.findById(id, options).then(instance => {
            if (instance) {
                res.json(instance);
            } else {
                console.error(`${ this.model.name } INSTANCE NOT FOUND`);
                res.sendStatus(404);
            }
        }).catch(error => {
            next(error);
        });
    };

    update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const options = req.query || {};
        const scopes = options.scopes || [];
        const values = req.body;
        const connector = scopes.length ? this.model.scope(scopes) : this.model;
        connector.findById(id, options).then(instance => {
            if (instance) {
                instance.update(values, {
                    fields: options.fields
                }).then(updated => {
                    console.error(typeof updated.getDataValue('data'));
                    res.json(updated);
                }).catch(next);
            } else {
                res.sendStatus(404);
            }
        }).catch(ValidationError, error => {
            res.sendStatus(403);
        }).catch(next);
    };
}
