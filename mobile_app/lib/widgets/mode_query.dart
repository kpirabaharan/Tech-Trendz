import 'dart:math' as math;

import 'package:flutter/material.dart';

class ModeQuery extends StatelessWidget {
  const ModeQuery({super.key});

  @override
  Widget build(BuildContext context) => RotatedBox(
        quarterTurns: 3,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            TextButton(onPressed: () => {}, child: Text('All')),
            TextButton(onPressed: () => {}, child: Text('New')),
            TextButton(onPressed: () => {}, child: Text('Top')),
          ],
        ),
      );
}
