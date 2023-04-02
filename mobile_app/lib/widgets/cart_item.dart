import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../models/cart.dart';

class CartItem extends StatelessWidget {
  final CartProducts item;

  CartItem({required this.item});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      child: ListTile(
        leading: Container(
          width: 75,
          height: 75,
          child: Image.network(
            '${dotenv.env['API_URL']}assets/${item.picturePath}',
            errorBuilder: (context, error, stackTrace) => const Center(child: Text('Error')),
            fit: BoxFit.contain,
          ),
        ),
        title: Text(item.name),
        subtitle: Text(item.brand),
        trailing: Container(
            width: 150,
            child: Row(mainAxisAlignment: MainAxisAlignment.end, children: [
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
              Text((item.cost * item.quantity).toStringAsFixed(2))
            ])),
      ),
    );
  }
}
