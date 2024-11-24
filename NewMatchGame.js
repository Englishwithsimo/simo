class MatchingGame {
            constructor(containerId, wordPairs) {
                this.container = document.getElementById(containerId);
                this.wordPairs = wordPairs;
                this.firstSelection = null;
                this.matches = new Set();
                
                this.createGameStructure();
                
                this.canvas = this.container.querySelector('.arrows');
                this.ctx = this.canvas.getContext('2d');
                
                this.resizeCanvas = this.resizeCanvas.bind(this);
                
                window.addEventListener('resize', this.resizeCanvas);
                
                this.initializeGame();
                this.resizeCanvas();
            }

            createGameStructure() {
                const gameHTML = `
                    <div class="game-container">
                        <div class="left-column"></div>
                        <canvas class="arrows"></canvas>
                        <div class="right-column"></div>
                    </div>
                    <div class="controls">
                        <button class="reset-button">Reset Exercise</button>
                    </div>
                `;
                
                // Append to existing container (preserving the title)
                this.container.insertAdjacentHTML('beforeend', gameHTML);
                
                // Add reset button listener
                this.container.querySelector('.reset-button').addEventListener('click', () => this.resetGame());
            }

            initializeGame() {
                const leftColumn = this.container.querySelector('.left-column');
                const rightColumn = this.container.querySelector('.right-column');
                
                leftColumn.innerHTML = '';
                rightColumn.innerHTML = '';

                const wordPairsWithIds = this.wordPairs.map((pair, index) => ({
                    ...pair,
                    id: index
                }));

                const shuffledLeft = [...wordPairsWithIds];
                const shuffledRight = [...wordPairsWithIds];
                
                this.shuffleArray(shuffledLeft);
                this.shuffleArray(shuffledRight);

                shuffledLeft.forEach((pair) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'word';
                    wordDiv.dataset.pair = pair.id;
                    wordDiv.textContent = pair.base;
                    leftColumn.appendChild(wordDiv);
                });

                shuffledRight.forEach((pair) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'word';
                    wordDiv.dataset.pair = pair.id;
                    wordDiv.textContent = pair.past;
                    rightColumn.appendChild(wordDiv);
                });

                this.addWordListeners();
            }

            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            resizeCanvas() {
                const gameContainer = this.container.querySelector('.game-container');
                this.canvas.width = gameContainer.offsetWidth;
                this.canvas.height = gameContainer.offsetHeight;
                this.drawMatchedArrows();
            }

            drawArrow(start, end) {
                this.ctx.beginPath();
                this.ctx.moveTo(start.x, start.y);
                this.ctx.lineTo(end.x, end.y);
                this.ctx.strokeStyle = '#2196f3';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }

            clearCanvas() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }

            drawMatchedArrows() {
                this.clearCanvas();
                this.matches.forEach(pair => {
                    const [left, right] = pair.split('-');
                    const leftElement = this.container.querySelector(`.left-column .word[data-pair="${left}"]`);
                    const rightElement = this.container.querySelector(`.right-column .word[data-pair="${right}"]`);
                    
                    const startX = leftElement.offsetLeft + leftElement.offsetWidth;
                    const startY = leftElement.offsetTop + leftElement.offsetHeight/2;
                    const endX = rightElement.offsetLeft;
                    const endY = rightElement.offsetTop + rightElement.offsetHeight/2;
                    
                    this.drawArrow({x: startX, y: startY}, {x: endX, y: endY});
                });
            }

            resetGame() {
                this.matches.clear();
                this.clearCanvas();
                this.container.querySelectorAll('.word').forEach(word => {
                    word.classList.remove('selected', 'correct', 'incorrect');
                });
                this.initializeGame();
            }

            showIncorrectFeedback(elements) {
                elements.forEach(element => {
                    element.classList.add('incorrect');
                    setTimeout(() => {
                        element.classList.remove('incorrect');
                        element.classList.remove('selected');
                    }, 1000);
                });
            }

            addWordListeners() {
                this.container.querySelectorAll('.word').forEach(word => {
                    word.addEventListener('click', () => {
                        if (this.matches.has(word.dataset.pair)) return;
                        
                        if (!this.firstSelection) {
                            this.firstSelection = word;
                            word.classList.add('selected');
                        } else {
                            if (this.firstSelection === word) {
                                this.firstSelection.classList.remove('selected');
                                this.firstSelection = null;
                                return;
                            }

                            const isMatch = 
                                (this.firstSelection.closest('.left-column') && word.closest('.right-column')) ||
                                (this.firstSelection.closest('.right-column') && word.closest('.left-column'));

                            if (isMatch && this.firstSelection.dataset.pair === word.dataset.pair) {
                                this.firstSelection.classList.remove('selected');
                                this.firstSelection.classList.add('correct');
                                word.classList.add('correct');
                                
                                const pair = this.firstSelection.dataset.pair;
                                this.matches.add(pair + '-' + pair);
                                this.drawMatchedArrows();

                                // Check if all matches are found
                                if (this.matches.size === this.wordPairs.length) {
                                    setTimeout(() => {
                                        alert('Congratulations! You completed the exercise!');
                                    }, 500);
                                }
                            } else {
                                this.showIncorrectFeedback([this.firstSelection, word]);
                            }

                            this.firstSelection = null;
                        }
                    });
                });
            }

            destroy() {
                window.removeEventListener('resize', this.resizeCanvas);
                this.container.innerHTML = '';
            }
        }
