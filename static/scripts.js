for (let i = 0; i < 80; i++) {
            let star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;  
            star.style.animationDelay = `${Math.random() * 5}s`;  
            let size = Math.random() * (25 - 5) + 5;  
            star.style.fontSize = `${size}px`;
            document.body.appendChild(star);
        }

        window.onload = function() {
            let elements = document.getElementsByClassName('typewrite');
            for (let i = 0; i < elements.length; i++) {
                let toRotate = elements[i].getAttribute('data-type');
                let period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i].getElementsByClassName('wrap')[0], JSON.parse(toRotate), period);
                }
            }
        };

        class TxtType {
            constructor(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            }

            tick() {
                let i = this.loopNum % this.toRotate.length;
                let fullTxt = this.toRotate[i];
                this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
                this.el.innerHTML = `<span class="wrap blink">${this.txt}</span>`;
                let delta = this.isDeleting ? 100 : 200 - Math.random() * 100;
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500;
                }
                setTimeout(() => this.tick(), delta);
            }
        }

        document.body.addEventListener('click', function() {
            var audio = document.getElementById('audio');
            audio.play();
                    
            document.body.style.transition = 'transform 2s ease';
            document.body.style.transform = 'rotate(720deg)';
            setTimeout(function() {
                document.body.style.transform = 'rotate(0deg)';
            }, 2000);
        });
