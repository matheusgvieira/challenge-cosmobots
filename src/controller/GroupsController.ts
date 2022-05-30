import { Request, Response } from 'express';

import GroupsService from '../services/GroupsService';

class GroupsController {
  async list(req: Request, res: Response): Promise<Response> {
    const response = await GroupsService.list();

    return res.json(response);
  }

  async listUserByGroupsId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const response = await GroupsService.listUserByGroupsId(id);

    return res.json(response);
  }
}

export default new GroupsController();
