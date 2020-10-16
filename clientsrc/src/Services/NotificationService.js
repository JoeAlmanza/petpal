import Swal from "sweetalert2";
export default class NotificationService {
  static async confirmAction(
    title = "Are you sure",
    text = "You won't be able to revert this!"
  ) {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        // iconHtml: `<img
        //   src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
        //   style="width: 200px"
        //   alt
        // />`,
        showCancelButton: true,
        confirmButtonColor: "teal",
        cancelButtonColor: "lightsalmon",
        confirmButtonText: "Yes, delete it!",
      });
      if (res.value) {
        return true;
      }
      return false;
    } catch (error) {}
  }
  static toast(title = "Default Toast", timer = 5000, icon = "info") {
    // @ts-ignore
    Swal.fire({
      title: title,
      icon: icon,
      // iconHtml: `<img
      //   src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
      //   style="width: 50px"
      //   alt
      // />`,
      timer: timer,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
  static setupQuestions(title = "Default Toast", icon = "info") {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"],
    })
      .queue([
        {
          title: "Question 1",
          text: "What is your name?",
        },
        "Would you like to adopt a cat or dog?",
        "What is your zipcode?",
      ])
      .then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value);
          Swal.fire({
            title: "All done!",
            //   html: `
            //   Your answers:
            // <pre><code>${answers}</code></pre>
            // `,
            confirmButtonText: "Now Get Started!",
          });
          let data = {
            name: answers[0],
            preference: answers[1],
            zip: answers[2],
          };
          console.log(data);
          //NOTE DISPATCH TO STORE
          // router.push({ name: "boards" })
        }
      });
  }
}
