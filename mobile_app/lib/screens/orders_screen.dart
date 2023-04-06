import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import '../providers/orders.dart';
import '../widgets/order_item.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  late Future _ordersFuture;

  Future _obtainOrdersFuture() async {
    final userId = Provider.of<Auth>(context, listen: false).userId;
    try {
      await Provider.of<Orders>(context, listen: false).fetchOrders(userId!);
    } catch (err) {
      print(err);
    }
  }

  @override
  void initState() {
    _ordersFuture = _obtainOrdersFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
        future: _ordersFuture,
        builder: (context, snapshot) => snapshot.connectionState == ConnectionState.waiting
            ? const Center(
                child: CircularProgressIndicator(),
              )
            : RefreshIndicator(
                onRefresh: () => _obtainOrdersFuture(),
                child: Consumer<Orders>(builder: (context, orders, child) {
                  return CustomScrollView(
                    slivers: [
                      SliverFillRemaining(
                        hasScrollBody: false,
                        child: Column(
                          children: [
                            ...(orders.orders.map((ord) => OrderItem(ord)).toList()),
                          ],
                        ),
                      ),
                    ],
                  );
                }),
              ),
      ),
    );
  }
}
