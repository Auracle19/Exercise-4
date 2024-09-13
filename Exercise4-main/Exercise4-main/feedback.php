<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$feedbackFile = 'feedback.txt';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $name = htmlspecialchars($_POST['name']);
    $comment = htmlspecialchars($_POST['comment']);

    $feedback = "Name: $name\nComment: $comment\n\n";

    if (is_writable($feedbackFile)) {
        if (file_put_contents($feedbackFile, $feedback, FILE_APPEND) === false) {
            echo "<p>Failed to write to file. Please check file permissions.</p>";
        } else {
            echo "<p>Thank you for your feedback!</p>";
        }
    } else {
        echo "<p>File is not writable. Please check the file permissions.</p>";
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    $testQuery = isset($_GET['test']) ? htmlspecialchars($_GET['test']) : 'No query provided';
    echo "<p>GET request received. Test query: $testQuery</p>";
} else {
    echo "<p>Invalid request method. Please submit the form properly.</p>";
}
?>
