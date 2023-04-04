import 'package:flutter/material.dart';

class ModeQuery extends StatelessWidget {
  final String mode;
  final Function setMode;

  ModeQuery({super.key, required this.mode, required this.setMode});

  @override
  Widget build(BuildContext context) {
    print('Query Widget');
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        const SizedBox(),
        TextButton(
          onPressed: () => setMode('all'),
          child: mode == 'all'
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
          onPressed: () => setMode('new'),
          child: mode == 'new'
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
          onPressed: () => setMode('top'),
          child: mode == 'top'
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
    );
  }
}
