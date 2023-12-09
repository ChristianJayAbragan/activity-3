<?php
require_once 'config.php';

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : ''; // Hash the password for security
$email = isset($_POST['email']) ? $_POST['email'] : '';

$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(['error' => 'Username already taken']);
} else {
    $sql = "INSERT INTO users (username, password, email) VALUES ('$username', '$password', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Registration failed']);
    }
}

$conn->close();
?>
