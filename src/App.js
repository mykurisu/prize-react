import React, { Component } from 'react';
import './App.css';

class RowItem extends Component {
  render() {
    const { content, activedId } = this.props;
    return (
      <div className={activedId === content ? 'row__item row__item-active' : 'row__item'} id={`row_item_${content}`}>
        {content}
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      activedId: '',
      prizeId: null,
      times: 0,
      actTimes: 0,
      isRolling: false,
    }
  }
  handleBegin () {
    if (!this.state.isRolling) {
      this.setState({
        activedId: '',
        prizeId: null,
        times: 0,
        actTimes: 0,
        isRolling: true
      }, () => {
        this.handlePlay()
      }) 
    }
  }
  handlePlay() {
    let prize = Math.floor(Math.random() * 12)
    console.log(prize)
    this.setState({
      prizeId: prize,
      activedId: 0
    })
    let times = this.state.list.length * Math.floor(Math.random() * 5 + 4)
    this.setState({
      times: times
    })
    this.begin = setInterval(() => {
      let num;

      if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) {
        clearInterval(this.begin)
        this.setState({
          isRolling: false
        })
        return
      }

      if (this.state.activedId === '') {
        num = 0
        this.setState({
          activedId: num
        })
      } else {
        num = this.state.activedId
        if (num === 11) {
          num = 0
          this.setState({
            activedId: num
          })
        } else {
          num = num + 1
          this.setState({
            activedId: num
          })
        }
      }

      this.setState({
        actTimes: this.state.actTimes + 1
      })

    }, 40)
  }
  render() {
    const { list, activedId } = this.state;
    return (
      <div className="App">
        <div className="prize">
          <div className="prize__container">
            <div className="container__area">
              <div className="begin__btn" onClick={() => this.handleBegin()}>
                点击开始
              </div>
              <div className="area__row">
                <RowItem content={list[0]} activedId={activedId} />
                <RowItem content={list[1]} activedId={activedId} />
                <RowItem content={list[2]} activedId={activedId} />
                <RowItem content={list[3]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={list[11]} activedId={activedId} />
                <RowItem content={list[4]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={list[10]} activedId={activedId} />
                <RowItem content={list[5]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={list[9]} activedId={activedId} />
                <RowItem content={list[8]} activedId={activedId} />
                <RowItem content={list[7]} activedId={activedId} />
                <RowItem content={list[6]} activedId={activedId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
