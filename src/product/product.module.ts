import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://zujxsqjl:xQ-rHr8_DJIA4BVRKWrNwH1Q4HXbjQb1@cow.rmq2.cloudamqp.com/zujxsqjl'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),

  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
