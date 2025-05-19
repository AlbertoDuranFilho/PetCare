<?php include('../db/conexao.php'); ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Login - PetCare</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<header>
    <h1>PetCare</h1>
</header>
<div class="menu"></div>
<div class="container">
    <h2>Login</h2>
    <form method="post">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>

        <label for="senha">Senha:</label>
        <input type="password" name="senha" id="senha" required>

        <input type="submit" value="Entrar">
    </form>
    <p>Não tem conta? <a href="registrar.php">Crie uma</a></p>
</div>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $stmt = $conn->prepare("SELECT id, senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $senha_hash);
        $stmt->fetch();
        if (password_verify($senha, $senha_hash)) {
            $_SESSION['usuario_id'] = $id;
            header("Location: index.php");
        } else {
            echo "<p class='alerta'>Senha incorreta!</p>";
        }
    } else {
        echo "<p class='alerta'>Email não encontrado!</p>";
    }
}
?>
</body>
</html>
