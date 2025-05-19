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
    <title>PetCare - Início</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
<?php include('../includes/header.php'); ?>
<div class="container">
    <div class="flex">
        <div class="col">
            <h2>Bem-vindo ao PetCare</h2>
            <p>Gerencie com facilidade a saúde dos seus pets.</p>
            <ul>
                <li><strong>Cadastrar Pet:</strong> Adicione um novo animal de estimação com dados e data da próxima vacina.</li>
                <li><strong>Visualizar Pets:</strong> Acompanhe todos os pets cadastrados.</li>
                <li><strong>Notificações:</strong> Receba alertas de vacina para manter os cuidados em dia.</li>
            </ul>
        </div>
        <div class="col">
            <h3>Notificações de Vacinas</h3>
            <?php
            $usuario_id = $_SESSION['usuario_id'];
            $hoje = date("Y-m-d");
            $sql = "SELECT * FROM pets WHERE usuario_id = $usuario_id";
            $result = $conn->query($sql);
            $temNotificacao = false;

            while($row = $result->fetch_assoc()) {
                $dias = (strtotime($row["data_vacina"]) - strtotime($hoje)) / 86400;
                if ($dias >= 0 && $dias <= 3) {
                    echo "<div class='notificacao'>";
                    echo "<strong>{$row['nome']}</strong>: Vacina em {$dias} dia(s)<br>";
                    echo "<small>Data: {$row['data_vacina']}</small>";
                    echo "</div>";
                    $temNotificacao = true;
                }
            }

            if (!$temNotificacao) {
                echo "<p>Nenhuma vacina próxima nos próximos 3 dias.</p>";
            }
            ?>
        </div>
    </div>
</div>
</body>
</html>
