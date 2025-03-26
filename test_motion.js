const { animate, press, scroll } = Motion;

    // Add scroll-triggered animations
    scroll(
      (info) => {
        const scrollY = window.scrollY;
        console.log('Current scroll position:', scrollY); // Debug log
        
        // Trigger at y = 100
        if (scrollY >= 1000 && scrollY < 1500) {
          animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
          animate("#city", { x: 100 });
        }
        // Trigger at y = 200
        else if (scrollY >= 1500 && scrollY < 2500) {
          animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
          animate("#city", { x: -300 });
        }
        // Trigger at y = 300
        else if (scrollY >= 2500 && scrollY < 3500) {
          animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
          animate("#city", { x: -500 });
        }
        // Reset when scrolling back up
        else {
          animate("#orgin", { scale: 1 }, { type: "spring", stiffness: 1000 });
          animate("#city", { x: 0 });
        }
      },
      {
        target: document.body,
        offset: ["start start", "end end"]
      }
    );

    press("#click_button_1", (element, startEvent) => {
      console.log("press started on", element);
      animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
      animate("#city", { x: 100 });
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });

      return (endEvent) => console.log("press ended on", element);
    });

    press("#click_button_2", (element, startEvent) => {
      console.log("press started on", element);
      animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
      animate("#city", { x: -300 });
      window.scrollTo({
        top: 1500,
        behavior: 'smooth'
      });

      return (endEvent) => console.log("press ended on", element);
    });

    press("#click_button_3", (element, startEvent) => {
      console.log("press started on", element);
      animate("#orgin", { scale: 3 }, { type: "spring", stiffness: 1000 });
      animate("#city", { x: -500 });
      window.scrollTo({
        top: 2500,
        behavior: 'smooth'
      });

      return (endEvent) => console.log("press ended on", element);
    });

    press("#click_button_4", (element, startEvent) => {
      animate("#orgin", { scale: 1 }, { type: "spring", stiffness: 1000 });
      animate("#city", { x: 0 });
      window.scrollTo({
        top: 150,
        behavior: 'smooth'
      });
      

      return (endEvent) => console.log("press ended on", element);
    });
