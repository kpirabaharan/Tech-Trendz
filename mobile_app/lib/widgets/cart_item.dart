import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import '../models/cart.dart';
import '../providers/auth.dart';

class CartItem extends StatelessWidget {
  final CartProducts item;

  CartItem({required this.item});

  @override
  Widget build(BuildContext context) {
    Future<void> handleAddToCart(String productId) async {
      try {
        await Provider.of<Auth>(context, listen: false).addToCart(productId);
      } catch (err) {
        print(err);
      }
    }

    Future<void> handleRemoveFromCart(String productId) async {
      try {
        await Provider.of<Auth>(context, listen: false).removeFromCart(productId);
      } catch (err) {
        print(err);
      }
    }

    Future<void> handleRemoveAllFromCart(String productId) async {
      try {
        await Provider.of<Auth>(context, listen: false).removeAllFromCart(productId);
      } catch (err) {
        print(err);
      }
    }

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
                          '${dotenv.env['ANROID_API_URL']}assets/${item.picturePath}',
                          errorBuilder: (context, error, stackTrace) =>
                              const Center(child: Text('Error')),
                          fit: BoxFit.contain,
                        )
                      : Image.network(
                          '${dotenv.env['API_URL']}assets/${item.picturePath}',
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
                            item.name,
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          TextButton(
                            onPressed: () => handleRemoveAllFromCart(item.id),
                            child: Text(
                              'Remove',
                              style: DefaultTextStyle.of(context).style.apply(color: Colors.red),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        item.brand,
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              IconButton(
                                onPressed: () => handleRemoveFromCart(item.id),
                                icon: const Icon(Icons.remove),
                              ),
                              Text(item.quantity.toString(),
                                  style: Theme.of(context).textTheme.titleMedium),
                              IconButton(
                                onPressed: () => handleAddToCart(item.id),
                                icon: const Icon(Icons.add),
                              ),
                            ],
                          ),
                          Text(
                            '\$${(item.quantity * item.cost).toStringAsFixed(2)}',
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
