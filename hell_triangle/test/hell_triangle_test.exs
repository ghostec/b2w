defmodule HellTriangleTest do
  use ExUnit.Case
  doctest HellTriangle

  test "base case", do: assert HellTriangle.calc([[1]]) == 1
  test "2 rows", do: assert HellTriangle.calc([[1], [1, 1]]) == 2
  test "2 rows, with a twist", do: assert HellTriangle.calc([[1], [2, 1]]) == 3
  test "3 rows, with max sum path different from previous", do: assert HellTriangle.calc([[1], [2, 1], [1,1,10]]) == 12
end
