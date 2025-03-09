package physics

import "math"

type Vector3 struct {
    X, Y, Z float64
}

func (v Vector3) Magnitude() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y + v.Z*v.Z)
}

type CarState struct {
    Position Vector3
    Velocity Vector3
    Rotation float64
    Gear     string
}

func UpdateCar(state CarState, action, terrain string) CarState {
    friction := map[string]float64{"dirt": 0.8, "snow": 0.4}[terrain]
    accel := 0.1
    turnRate := 0.05

    switch action {
    case "accelerate":
        if state.Gear == "N" {
            state.Gear = "1"
        }
        gearFactor := map[string]float64{"1": 0.5, "2": 0.7, "3": 0.9, "4": 1.0, "R": -0.5}[state.Gear]
        state.Velocity.Z += accel * friction * gearFactor
    case "brake":
        state.Velocity.Z -= accel * friction
        if state.Velocity.Z < 0 && state.Gear != "R" {
            state.Velocity.Z = 0
        }
    case "left":
        state.Rotation += turnRate
    case "right":
        state.Rotation -= turnRate
    case "gear_N", "gear_1", "gear_2", "gear_3", "gear_4", "gear_R":
        state.Gear = action[5:]
    }

    angle := state.Rotation
    state.Position.X += state.Velocity.Z * math.Sin(angle)
    state.Position.Z += state.Velocity.Z * math.Cos(angle)
    state.Velocity.Z *= 0.98

    return state
}
