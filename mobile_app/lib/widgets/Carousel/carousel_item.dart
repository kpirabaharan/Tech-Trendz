import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import '../../models/product.dart';

class CarouselItem extends StatelessWidget {
  final Product product;
  final double itemSize;

  const CarouselItem({super.key, required this.product, this.itemSize = 500});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          elevation: 16,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          child: SizedBox(
            width: itemSize,
            child: SizedBox(
              height: 150,
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
        ),
        Text(product.name),
      ],
    );
  }
}
