import { Body, Controller, Get, Middlewares, Path, Post, Request, Route, SuccessResponse, Tags } from 'tsoa';
import prisma from '../clients/prismaClient';
import { firebaseAuthMiddleware } from '../middleware/authMiddleware';
import { getUserByToken } from '../clients/firebaseClient';
import { sendToOpenAI } from '../clients/openAIClient';
import { runPythonScript } from '../clients/pythonClient';

export const ABSOLUTE_PATH = '/Users/ufukyagmur/Desktop/LoGPT/text-similarity/';

interface Message {
  id: string;
  content: string;
  author: string;
  time: Date;
  sessionID: string;
  answerId?: string;
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
  public async sendMessage(@Request() request: Request, @Body() body: MessageRequest): Promise<Message> {
    const bearerHeader = request.headers['authorization'].split(' ')[1];
    const user = await getUserByToken(bearerHeader);

    const session = await prisma.session.findUnique({
      where: {
        id: body.sessionID,
      },
    });

    if (!session) {
      await prisma.session.create({
        data: {
          id: body.sessionID,
          author: user.uid,
          title: body.content,
          time: body.time,
        },
      });
    }

    prisma.message.create({
      data: {
        content: body.content,
        author: 'openAI',
        time: body.time,
        sessionID: body.sessionID,
      },
    });

    const parsedMsg = body.content.split('\n');
    const title = parsedMsg[0].split(' ')[1];
    const logFile = parsedMsg[1].split(' ')[1];
    const userMessage = parsedMsg[2].split(' ')[1];

    // console.log(await sendToOpenAI(body.content, 'we have no log for now'));
    const nlpResponse = await runPythonScript([
      `${ABSOLUTE_PATH}/data/${logFile}.out`,
      `${ABSOLUTE_PATH}/data/${logFile}_embeddings.pt`,
      title,
    ]);

    const openAIAnswer = await sendToOpenAI(userMessage, nlpResponse);

    const responseContent = openAIAnswer.content + '\n\n\n' + nlpResponse;
    const answerMessage = await prisma.message.create({
      data: {
        content: responseContent,
        author: user.uid,
        time: new Date(),
        sessionID: body.sessionID,
      },
    });
    await prisma.message.create({
      data: {
        content: body.content,
        author: user.uid,
        time: body.time,
        sessionID: body.sessionID,
        answerId: answerMessage.id,
      },
    });

    return answerMessage;
  }

  @SuccessResponse('200')
  @Get('/history')
  @Middlewares(firebaseAuthMiddleware)
  public async getHistory(@Request() request: Request): Promise<HistoryResponse[]> {
    const user = await getUserByToken(request.headers['authorization'].split(' ')[1]);
    return prisma.session.findMany({
      where: {
        author: user.uid,
      },
    });
  }

  @SuccessResponse('200')
  @Get('/history/{sessionId}')
  @Middlewares(firebaseAuthMiddleware)
  public async getHistoryById(@Request() request: Request, @Path() sessionId: string): Promise<Message[]> {
    const user = await getUserByToken(request.headers['authorization'].split(' ')[1]);
    return prisma.message.findMany({
      where: {
        sessionID: sessionId,
        author: user.uid ? user.uid : 'B0lLmdklNNRuv4UgWr0IwOZvPK62',
      },
    });
  }
}
