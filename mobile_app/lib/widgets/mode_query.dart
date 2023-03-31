import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/products.dart';

class ModeQuery extends StatefulWidget {
  const ModeQuery({super.key});

  @override
  State<ModeQuery> createState() => _ModeQueryState();
}

class _ModeQueryState extends State<ModeQuery> {
  void _setMode(String mode) {
    setState(() {
      Provider.of<Products>(context, listen: false).setMode(mode);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Products>(
      builder: (context, products, child) => Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          const SizedBox(),
          TextButton(
            onPressed: () => _setMode('all'),
            child: products.mode == 'all'
                ? const Text(
                    'All',
                    style: TextStyle(color: Colors.blue),
                  )
                : const Text(
                    'All',
                    style: TextStyle(color: Colors.white),
                  ),
          ),
          TextButton(
            onPressed: () => _setMode('new'),
            child: products.mode == 'new'
                ? const Text(
                    'New',
                    style: TextStyle(color: Colors.blue),
                  )
                : const Text(
                    'New',
                    style: TextStyle(color: Colors.white),
                  ),
          ),
          TextButton(
            onPressed: () => _setMode('top'),
            child: products.mode == 'top'
                ? const Text(
                    'Top',
                    style: TextStyle(color: Colors.blue),
                  )
                : const Text(
                    'Top',
                    style: TextStyle(color: Colors.white),
                  ),
          ),
          const SizedBox(),
        ],
      ),
    );
  }
}
