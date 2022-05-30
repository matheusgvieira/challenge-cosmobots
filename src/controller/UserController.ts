import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {
  async list(req: Request, res: Response): Promise<Response> {
    const response = await UserService.list();

    return res.json(response);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await UserService.show(id);

    return res.json(response);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await UserService.update(id, req.body);

    return res.json(response);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { firstName, lastName, email, groupsId } = req.body;

    const response = await UserService.create({
      firstName,
      lastName,
      email,
      groupsId,
    });

    return res.json(response);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await UserService.delete(id);

    return res.json(response);
  }

  async retrieve(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await UserService.retrieve(id);

    return res.json(response);
  }
}

export default new UserController();
