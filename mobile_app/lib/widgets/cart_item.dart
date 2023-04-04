import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import '../models/cart.dart';
import '../providers/auth.dart';

class CartItem extends StatefulWidget {
  final CartProducts item;

  CartItem({required this.item});

  @override
  State<CartItem> createState() => _CartItemState();
}

class _CartItemState extends State<CartItem> {
  Future<void> handleAddToCart(String productId) async {
    setState(() {
      Provider.of<Auth>(context, listen: false).addToCart(productId);
    });
  }

  Future<void> handleRemoveFromCart(String productId) async {
    setState(() {
      Provider.of<Auth>(context, listen: false).removeFromCart(productId);
    });
  }

  Future<void> handleRemoveAllFromCart(String productId) async {
    setState(() {
      Provider.of<Auth>(context, listen: false).removeAllFromCart(productId);
    });
  }

  @override
  Widget build(BuildContext context) {
    print('Cart Item');
    return SizedBox(
        height: 175,
        child: Row(
          children: [
            Expanded(
              flex: 1,
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                child: SizedBox(
                  // decoration: BoxDecoration(border: Border.all(width: 1)),
                  height: 140,
                  child: Platform.isAndroid
                      ? Image.network(
                          '${dotenv.env['ANROID_API_URL']}assets/${widget.item.picturePath}',
                          errorBuilder: (context, error, stackTrace) =>
                              const Center(child: Text('Error')),
                          fit: BoxFit.contain,
                        )
                      : Image.network(
                          '${dotenv.env['API_URL']}assets/${widget.item.picturePath}',
                          errorBuilder: (context, error, stackTrace) =>
                              const Center(child: Text('Error')),
                          fit: BoxFit.contain,
                        ),
                ),
              ),
            ),
            Expanded(
                flex: 2,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(8, 4, 8, 4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            widget.item.name,
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          TextButton(
                            onPressed: () => handleRemoveAllFromCart(widget.item.id),
                            child: Text(
                              'Remove',
                              style: DefaultTextStyle.of(context).style.apply(color: Colors.red),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        widget.item.brand,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              IconButton(
                                onPressed: () => handleRemoveFromCart(widget.item.id),
                                icon: const Icon(Icons.remove),
                              ),
                              Text(widget.item.quantity.toString(),
                                  style: Theme.of(context).textTheme.titleMedium),
                              IconButton(
                                onPressed: () => handleAddToCart(widget.item.id),
                                icon: const Icon(Icons.add),
                              ),
                            ],
                          ),
                          Text(
                            '\$${(widget.item.quantity * widget.item.cost).toStringAsFixed(2)}',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ],
                      )
                    ],
                  ),
                ))
          ],
        ));
  }
}
