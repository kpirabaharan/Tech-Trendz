import 'dart:math';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/order.dart';
import '../providers/orders.dart';

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
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      height: _expanded ? _order.orderProducts.length * 22 + 160 : 150,
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
                        style: TextStyle(fontSize: 12, color: Colors.green),
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
                  height: _expanded ? _order.orderProducts.length * 22 + 12 : 0,
                  child: ListView(
                    children: _order.orderProducts
                        .map(
                          (prod) => Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                prod.name,
                                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                              ),
                              Text(
                                '${prod.quantity}x \$${prod.cost}',
                                style: TextStyle(fontSize: 18, color: Colors.grey),
                              )
                            ],
                          ),
                        )
                        .toList(),
                  ),
                ),
              ),
              Divider(),
              Container(
                height: 22,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'Total: \$${_order.totalAmount.toStringAsFixed(2)}',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
