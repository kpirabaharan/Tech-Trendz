import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class ModeQuery extends StatelessWidget {
  const ModeQuery({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('All'),
        Text('New'),
        Text('Top'),
      ],
    );
  }
}
