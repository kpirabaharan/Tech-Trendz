import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../models/order.dart';

class OrderItem extends StatefulWidget {
  final Order orderItem;

  OrderItem(this.orderItem, {super.key});

  @override
  State<OrderItem> createState() => _OrderItemState();
}

class _OrderItemState extends State<OrderItem> {
  var _expanded = false;
  late final Order _order;

  @override
  void initState() {
    _order = widget.orderItem;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context).size;
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      height: _expanded ? min(_order.orderProducts.length * 91 + 208, 438) : 208,
      child: Card(
        margin: const EdgeInsets.all(10),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Order Id: ${_order.id.substring(_order.id.length - 9)}',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      Text(
                        'Order Date: ${_order.orderDate}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      Text(
                        'Estimated Delivery: ${_order.deliveryDate}',
                        style: const TextStyle(fontSize: 12, color: Colors.green),
                      ),
                    ],
                  ),
                  IconButton(
                    onPressed: () {
                      setState(() {
                        _expanded = !_expanded;
                      });
                    },
                    icon: Icon(_expanded ? Icons.expand_less : Icons.expand_more),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(top: 10.0),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  height: _expanded ? min(_order.orderProducts.length * 91, 225) : 0,
                  child: ListView(
                    children: _order.orderProducts
                        .map(
                          (prod) => Container(
                            margin: const EdgeInsets.symmetric(vertical: 5.0),
                            padding: const EdgeInsets.all(3.0),
                            decoration: BoxDecoration(border: Border.all(color: Colors.grey)),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Container(
                                  height: 75,
                                  width: 100,
                                  child: Image.network(
                                    Platform.isAndroid
                                        ? '${dotenv.env['ANDROID_API_URL']}assets/${prod.picturePath}'
                                        : '${dotenv.env['API_URL']}assets/${prod.picturePath}',
                                    errorBuilder: (context, error, stackTrace) =>
                                        const Center(child: Text('Error')),
                                    fit: BoxFit.contain,
                                  ),
                                ),
                                Text(
                                  prod.name,
                                  style: Theme.of(context).textTheme.titleMedium,
                                ),
                                Spacer(),
                                Text(
                                  '${prod.quantity}x \$${prod.cost}',
                                  style: Theme.of(context).textTheme.titleMedium,
                                )
                              ],
                            ),
                          ),
                        )
                        .toList(),
                  ),
                ),
              ),
              const Divider(
                thickness: 1,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        'Subtotal:',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      Text(
                        'Tax:',
                        style: Theme.of(context).textTheme.titleSmall,
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 34.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '\$${_order.totalAmount.toStringAsFixed(2)}',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        Text(
                          '+ \$${(_order.totalAmount * 0.13).toStringAsFixed(2)}',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Divider(
                indent: mediaQuery.width * 0.45,
                thickness: 1,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    'Total:',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 15),
                    child: Text(
                      '\$${(_order.totalAmount * 1.13).toStringAsFixed(2)}',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
