document.addEventListener("DOMContentLoaded", () => {
  initFormValidation();
});

function initFormValidation() {
  const form = document.getElementById("infoForm");
  if (!form) return;

  const privacyCheckbox = document.getElementById("politicaPrivacidade");
  const formFields = document.querySelectorAll(
    "#infoForm input, #infoForm select"
  );

  // mostra o pop-up
  privacyCheckbox?.addEventListener("click", handlePrivacyCheckbox);

  formFields.forEach((field) => {
    field.addEventListener("input", () => applyCustomValidation(field));
    field.addEventListener("invalid", (event) => {
      // impede a mensagem padrão
      event.preventDefault();
      applyCustomValidation(field);
    });
  });

  // submit
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      alert("Por favor, corrija os campos inválidos antes de enviar.");
    }
    // classe do Bootstrap
    form.classList.add("was-validated");
  });
}

function handlePrivacyCheckbox(event) {
  if (event.target.checked) {
    alert(
      "Política de Privacidade:\n\nA sua privacidade é importante para nós. É política do respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site , e outros sites que possuímos e operamos. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado."
    );
  }
}

function applyCustomValidation(field) {
  field.setCustomValidity("");

  if (field.validity.valid) return;

  const errorMessage = getCustomErrorMessage(field);
  if (errorMessage) {
    field.setCustomValidity(errorMessage);
    // mostra a tooltip de erro com a mensagem
    field.reportValidity();
  }
}

// para mostrar a mensagem de erro em pt
function getCustomErrorMessage(field) {
  const { validity, name, type } = field;

  if (validity.valueMissing) {
    return "Este campo é obrigatório.";
  }

  // regex
  if (validity.patternMismatch) {
    switch (name) {
      case "nome":
      case "apelido":
      case "concelho":
        return "Apenas caracteres alfabéticos.";
      case "telefone":
        return "Apenas telefones portugueses (9 dígitos, começando com 2 ou 9).";
      default:
        if (type === "email") {
          return "Insira um endereço de e-mail válido.";
        }
    }
  }

  // idade fora do range
  if (validity.rangeUnderflow || validity.rangeOverflow) {
    return "A idade deve estar entre 18 e 50 anos.";
  }

  // formato incorreto email
  if (validity.typeMismatch && type === "email") {
    return "Insira um endereço de e-mail válido.";
  }

  return "";
}

// scroll para o form ao clicar no cta
// obs: podia mandar para o top da pagina mas se o form mudar de lugar teriamos que mudar a funcao
document.addEventListener("DOMContentLoaded", () => {
  const ctaFooterButton = document.querySelector(".cta-button");
  const infoForm = document.getElementById("infoForm");

  if (ctaFooterButton && infoForm) {
    ctaFooterButton.addEventListener("click", (e) => {
      e.preventDefault();

      // devido ao header do form
      const offset = 150;

      // Calcula a posição do formulário na página com offset
      const elementPosition = infoForm.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  }
});
