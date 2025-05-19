<?php include('../db/conexao.php'); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Registrar - PetCare</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header>
    <h1>PetCare</h1>
</header>
<div class="menu"></div>
<div class="container">
    <h2>Criar Conta</h2>
    <form method="post">
        <label for="nome">Nome:</label>
        <input type="text" name="nome" id="nome" required>

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        <label for="senha">Senha:</label>
        <input type="password" name="senha" id="senha" required>

        <input type="submit" value="Registrar">
    </form>
    <p>Já tem conta? <a href="login.php">Faça login</a></p>
</div>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $senha);

    if ($stmt->execute()) {
        echo "<script>alert('Registrado com sucesso! Faça login.'); window.location='login.php';</script>";
    } else {
        echo "<p class='alerta'>Erro ao registrar: " . $conn->error . "</p>";
    }
}
?>
</body>
</html>
