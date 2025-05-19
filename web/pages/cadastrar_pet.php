<?php include('../db/conexao.php');
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cadastrar Pet - PetCare</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<?php include('../includes/header.php'); ?>
<div class="container">
    <h2>Cadastrar Novo Pet</h2>
    <form method="post">
        <label for="nome">Nome do Pet:</label>
        <input type="text" name="nome" id="nome" required>

        <label for="idade">Idade (em anos):</label>
        <input type="number" name="idade" id="idade">

        <label for="raca">Raça:</label>
        <input type="text" name="raca" id="raca">

        <label for="peso">Peso (kg):</label>
        <input type="text" name="peso" id="peso">

        <label for="vacina">Data da Próxima Vacina:</label>
        <input type="date" name="vacina" id="vacina">

        <input type="submit" value="Salvar Pet">
    </form>
</div>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario_id = $_SESSION['usuario_id'];
    $nome = $_POST['nome'];
    $idade = $_POST['idade'];
    $raca = $_POST['raca'];
    $peso = $_POST['peso'];
    $vacina = $_POST['vacina'];

    $sql = "INSERT INTO pets (usuario_id, nome, idade, raca, peso, data_vacina)
            VALUES ('$usuario_id', '$nome', '$idade', '$raca', '$peso', '$vacina')";
    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Pet cadastrado com sucesso!'); window.location='listar_pets.php';</script>";
    } else {
        echo "<p class='alerta'>Erro: " . $conn->error . "</p>";
    }
}
?>
</body>
</html>
