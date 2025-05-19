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
    <title>Meus Pets - PetCare</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<?php include('../includes/header.php'); ?>
<div class="container">
    <h2>Meus Pets</h2>
<?php
$usuario_id = $_SESSION['usuario_id'];
$hoje = date("Y-m-d");
$sql = "SELECT * FROM pets WHERE usuario_id = $usuario_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $dias = (strtotime($row["data_vacina"]) - strtotime($hoje)) / 86400;
        echo "<div class='pet'>";
        echo "<strong>{$row['nome']}</strong><br>";
        echo "Idade: {$row['idade']} anos<br>";
        echo "Raça: {$row['raca']}<br>";
        echo "Peso: {$row['peso']} kg<br>";
        echo "Vacina: {$row['data_vacina']}";
        if ($dias >= 0 && $dias <= 3) {
            echo " <span class='alerta'>(Vacina em {$dias} dias!)</span>";
        }
        echo "</div>";
    }
} else {
    echo "<p>Você ainda não cadastrou nenhum pet.</p>";
}
?>
</div>
</body>
</html>
