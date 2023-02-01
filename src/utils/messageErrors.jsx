import Swal from 'sweetalert2';

export const messageErrors = () => {
  const validateInputError = () => {
    Swal.fire({
      title: 'Preencha os campos vazios!',
      icon: 'warning',
      confirmButtonColor: '#41B8D2',
      confirmButtonText: 'OK',
    });
  };

  return { validateInputError };
};
