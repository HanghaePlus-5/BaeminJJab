import { Test, TestingModule } from '@nestjs/testing';

import { OrdersService } from './orders.service';


import { UserType } from 'src/types';
import { PrismaService } from 'src/prisma';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('OrdersService', () => {
  let service: OrdersService;
  let mockPrisma: DeepMockProxy<PrismaClient>;

  const cusomerUser = {
    userId: 1,
    email: 'customer1@delivery.com',
    name: 'Customer Kim',
    password: 'qwe1234',
    type: UserType.CUSTOMER,
  };

  const businessUser = {
    userId: 2,
    email: 'business1@delivery.com',
    name: 'Business Kim',
    password: 'qwe1234',
    type: UserType.BUSINESS,
  };

  const order1 = {
    userId: 1,
    storeId: 1,
    paymentId: 1,
  };



  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        PrismaService,
        ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<OrdersService>(OrdersService);
    mockPrisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Order Creates normally', () => {
    it('should return id value of the created order.', async () => {
      const result = await service.createOrder(order1)
      console.log(result)
      expect(result).toBe(order1);
      
    });

  // describe('Order Creation', () => {
  //   describe('Order Creates normally', () => {
  //     it('should return id value of the created order.', () => {
  //       const order1 = new CustomOrder(cusomerUser.userId);
  //       const result = service.addOrder(order1,cusomerUser);
  //       console.log(service.Orders);
  //       expect(result).toBe(order1.id);
        
  //     });

  //     it('should create an Order that is status of "paymentProcessing"', () => {
  //       let serviceMock = jest.spyOn(service,"processPayment");
  //       const order1 = new CustomOrder(cusomerUser.userId);
  //       service.addOrder(order1,cusomerUser);
  //       expect(order1.status).toBe("paymentProcessing");
  //     });

  //     it('should inform payment module by calling processPayment function', () => {
  //       let serviceMock = jest.spyOn(service,"processPayment");
  //       const order1 = new CustomOrder(cusomerUser.userId);
  //       service.addOrder(order1,cusomerUser);
  //       expect(serviceMock).toHaveBeenCalledWith(order1);
  //     });
  //   });
    // describe('Order General Validation Check', () => {
    //   it('should return error if business ueser tries to make an order', () => {
    //     const order1 = new CustomOrder(businessUser.userId);
    //     expect(() => {
    //       service.addOrder(order1, businessUser);
    //     }).toThrowError('Only customers are allowed to add orders.');

    //   });
    //   it('should return error if a user tries to make an order from a non-existing store', () => {
    //     const order1 = new CustomOrder(businessUser.userId)
    //     expect(() => {
    //       service.addOrder(order1, businessUser);
    //     }).toThrowError('Only customers are allowed to add orders.');

    //   });
    //   it('should return false if a user tries to make an order of a non-existing item', () => {
    //     const order1 = new CustomOrder(1);
    //     expect(order1).toBe(false);
    //   });

    // });
    // describe('Order Business Validation Check', () => {
    //   it('should return false if a user tries to make an order of more than 10 item', () => {
    //     const order1 = new CustomOrder(1);
    //     expect(order1).toBe(false);
    //   });
    //   it('should return false if a user tries to make an order of 0 item', () => {
    //     const order1 = new CustomOrder(1);
    //     expect(order1).toBe(false);
    //   });

    //   it('should return error if a user tries to make an order while incomplete order exists', () => {
    //     const order1 = new CustomOrder(cusomerUser.userId)
    //     console.log(order1);
    //     console.log(service.Orders);
    //     expect(() => {
    //       service.addOrder(order1, cusomerUser);
    //     }).toThrowError('Only customers are allowed to add orders.');
    //   });

    //   it('should return false if a user tries to make an order with not enough stock', () => {
    //     const order1 = new CustomOrder(1);
    //     expect(order1).toBe(false);
    //   });
    // });

  });
});
