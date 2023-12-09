<?php
require_once 'config.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Incorrect password']);
    }
} else {
    echo json_encode(['error' => 'User not found']);
}

$conn->close();
?>
