$(document).ready(function(){
    // nome vazio ou com números 
    $("input[name=nome]").blur(function(event){
        if(!/^[A-Za-z ]*$/.test($("input[name=nome]").val())){
            $("input[name=nome]").css("border-color", "#ff8383");
        } else if( $("input[name=nome]").val() == "" ){
            $("input[name=nome]").css("border-color", "#ff8383");
        } else {
            $("input[name=nome]").css("border-color", "");
        }
    });
    // sobrenome vazio ou com núemros
    $("input[name=sobrenome]").blur(function(event){
        if(!/^[A-Za-z ]*$/.test($("input[name=sobrenome]").val())){
            $("input[name=sobrenome]").css("border-color", "#ff8383");
        } else if( $("input[name=sobrenome]").val() == "" ){
            $("input[name=sobrenome]").css("border-color", "#ff8383");
        } else {
            $("input[name=sobrenome]").css("border-color", "");
        }
    });

    $("input[name=numero]").blur(function(event){
         if($("input[name=numero]").val() == ""){
            $("input[name=numero]").css("border-color", "#ff8383");
         } else {
            $("input[name=numero]").css("border-color", "");
         }
    });

    $("input[name=nascimento]").blur(function(event){
        if($("input[name=nascimento]").val() == ""){
            $("input[name=nascimento]").css("border-color", "#ff8383");
        } else {
            $("input[name=nascimento]").css("border-color", "");
        }
    });


    $("input[name=cep]").blur(function(event){
        // cep vazio
        if($("input[name=cep]").val() == ""){
            $("#cepInvalido").css("display", "block");
            $("input[name=cep]").css("border-color", "#ff8383");
            return;
        }

        var cep = $("input[name=cep]").val();
        if(/^[0-9]{8}$/.test(cep)){
            // consulta ao web service
            $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json/`,
                success: function(result) {
                    if(!result.erro){
                        $("input[name=rua]").val(result.logradouro);
                        $("input[name=cidade]").val(result.localidade);
                        $("input[name=uf]").val(result.uf);
                        $("input[name=bairro]").val(result.bairro);
                        $("input[name=numero]").focus();
                        $("input[name=rua]").css("border-color", "");
                        $("input[name=cidade]").css("border-color", "");
                        $("input[name=uf]").css("border-color", "");
                        $("input[name=bairro]").css("border-color", "");
                        $("input[name=numeoro]").css("border-color", "");
                        $("input[name=cep]").css("border-color", "");
                        $("#cepInvalido").css("display", "none");
                    } else {
                        $("#cepInvalido").css("display", "block");
                        $("input[name=cep]").css("border-color", "#ff8383");
                    }
                }
            });

        } else {
            $("input[name=rua]").val("");
            $("input[name=cidade]").val("");
            $("input[name=uf]").val("");
            $("input[name=bairro]").val("");
            $("input[name=cep]").css("border-color", "#ff8383");
            $("#cepInvalido").css("display", "block");
        }
    });
    // cpf inválido
    $("input[name=cpf]").blur(function(event){
        if(!CPF.validate($("input[name=cpf]").val())){
            $("input[name=cpf]").css("border-color", "#ff8383");
            $("#cpfInvalido").css("display", "block");
        } else {
            $("input[name=cpf]").css("border-color", "");
            $("#cpfInvalido").css("display", "none");
        }
    });

    $("#enviar").click(function(event){
        let campos = ["nome", "sobrenome", "cep", "rua", "bairro", "cidade", "uf", "numero", "nascimento", "cpf"];
        let tamanho = campos.length;
        for(let i=tamanho-1; i >= 0 ; --i){
            if($(`input[name=${campos[i]}]`).val() == ""){
                $(`input[name=${campos[i]}]`).focus();
                $(`input[name=${campos[i]}]`).css("border-color", "#ff8383");
            } else {
                $(`input[name=${campos[i]}]`).css("border-color", "");
            }
        }
        if(!/^[A-Za-z ]*$/.test($("input[name=nome]").val())){
            $(`input[name=nome]`).css("border-color", "#ff8383");
        }
        if(!/^[A-Za-z ]*$/.test($("input[name=sobrenome]").val())){
            $(`input[name=sobrenome]`).css("border-color", "#ff8383");
        }
        
        if(!CPF.validate($("input[name=cpf]").val())){
            $("#cpfInvalido").css("display", "block");
        } else {
            $("#cpfInvalido").css("display", "none");
        }        
    });
});
