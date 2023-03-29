import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../../models/product.dart';

class CarouselItem extends StatelessWidget {
  final Product product;

  const CarouselItem({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Card(
        elevation: 16,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: GridTile(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Image.network(
              '${dotenv.env['API_URL']}assets/${product.picturePath}',
              errorBuilder: (context, error, stackTrace) =>
                  const Center(child: Text('Could not load Image')),
              fit: BoxFit.contain,
            ),
          ),
        ),
      ),
    ]);
  }
}
