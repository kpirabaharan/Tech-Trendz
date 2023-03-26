import './cart.dart';

class User {
  final String id;
  final String firstName;
  final String lastName;
  final String email;
  final int phoneNumber;
  final String dateOfBirth;
  final Cart cart;

  User({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phoneNumber,
    required this.dateOfBirth,
    required this.cart,
  });
}
