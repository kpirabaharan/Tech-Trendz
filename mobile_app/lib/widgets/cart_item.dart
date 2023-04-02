import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../models/cart.dart';

class CartItem extends StatelessWidget {
  final CartProducts item;

  CartItem({required this.item});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(border: Border.all(width: 1)),
      child: ListTile(
        visualDensity: VisualDensity(vertical: 2),
        leading: Container(
          decoration: BoxDecoration(border: Border.all(width: 1)),
          width: 80,
          height: 100,
          child: Platform.isAndroid
              ? Image.network(
                  '${dotenv.env['ANROID_API_URL']}assets/${item.picturePath}',
                  errorBuilder: (context, error, stackTrace) => const Center(child: Text('Error')),
                  fit: BoxFit.contain,
                )
              : Image.network(
                  '${dotenv.env['API_URL']}assets/${item.picturePath}',
                  errorBuilder: (context, error, stackTrace) => const Center(child: Text('Error')),
                  fit: BoxFit.contain,
                ),
        ),
        title: Text(item.name),
        subtitle: Text(item.brand),
        trailing: Container(
          decoration: BoxDecoration(border: Border.all(width: 1)),
          width: 100,
          child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Expanded(
                  child: Text(
                    (item.cost * item.quantity).toStringAsFixed(2),
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    IconButton(
                      padding: EdgeInsets.all(5),
                      constraints: BoxConstraints(),
                      onPressed: () => {},
                      icon: Icon(Icons.remove),
                    ),
                    Text(item.quantity.toString()),
                    IconButton(
                      padding: EdgeInsets.all(5),
                      constraints: BoxConstraints(),
                      onPressed: () => {},
                      icon: Icon(Icons.add),
                    ),
                  ],
                )
              ]),
        ),
      ),
    );
  }
}
