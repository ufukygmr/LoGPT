import {
  Body,
  Controller,
  Get,
  Middlewares,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import prisma from '../clients/prismaClient';
import { firebaseAuthMiddleware } from '../middleware/authMiddleware';
import { getUserByToken } from '../clients/firebaseClient';
import express from 'express';

interface Message {
  id: string;
  content: string;
  author: string;
  time: Date;
  sessionID: string;
  answerId: string | null;
}

interface MessageRequest {
  content: string;
  time: Date;
  sessionID: string;
}

interface HistoryResponse {
  id: string;
  title: string;
  time: Date;
}

@Route('/message')
@Tags('Message')
export class MessageController extends Controller {
  @SuccessResponse('200')
  @Get('/')
  @Middlewares(firebaseAuthMiddleware)
  public async getMessage(): Promise<Message[]> {
    return prisma.message.findMany({
      where: {
        id: '1123',
      },
    });
  }

  @SuccessResponse('200')
  @Post('/send')
  @Middlewares(firebaseAuthMiddleware)
  public async sendMessage(
    @Request() request: Request,
    @Body() body: MessageRequest
  ): Promise<Message> {
    const bearerHeader = request.headers['authorization'];
    const user = await getUserByToken(bearerHeader);

    return prisma.message.create({
      data: {
        content: body.content,
        author: user.uid ? user.uid : 'B0lLmdklNNRuv4UgWr0IwOZvPK62',
        time: body.time,
        sessionID: body.sessionID,
      },
    });
  }

  @SuccessResponse('200')
  @Get('/history')
  @Middlewares(firebaseAuthMiddleware)
  public async getHistory(
    @Request() request: Request
  ): Promise<HistoryResponse[]> {
    //TODO Get User ID from token
    const user = await getUserByToken(request.headers['authorization']);
    const id = 'B0lLmdklNNRuv4UgWr0IwOZvPK62';
    return prisma.session.findMany({
      where: {
        author: user.uid ? user.uid : id,
      },
    });
  }

  @SuccessResponse('200')
  @Get('/history/{sessionId}')
  @Middlewares(firebaseAuthMiddleware)
  public async getHistoryById(
    @Request() request: Request,
    @Path() sessionId: string
  ): Promise<Message[]> {
    const user = await getUserByToken(request.headers['authorization']);
    return prisma.message.findMany({
      where: {
        sessionID: sessionId,
        author: user.uid ? user.uid : 'B0lLmdklNNRuv4UgWr0IwOZvPK62',
      },
    });
  }
}
