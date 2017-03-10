defmodule HellTriangle do
  def calc(triangle) do
    # This is the entry method.
    max_sum(triangle, [])
  end

  defp max_sum([head | tail], acc) do
    # The first argument is the Hell Triangle. e.g [[1], [1,2], [1,2,3], ...]
    # Second argument should be, initially, an empty list, []

    # [:p] is a placeholder value added to both ends of acc list, in order to
    # compare first and last values of next row with first and last of previous row.
    max_sum(tail, new_acc(head, [:p] ++ acc ++ [:p], []))
  end

  defp max_sum([], acc) do
    # Base case, when hell triangle is empty, get max value
    # from last computed row, acc

    Enum.max(acc)
  end

  defp new_acc([head | tail], last_row, cur_row) do
    # Calculates cur_row, max sum values at each index, for a given row in
    # Hell Triangle.
    # First argument is a row in Hell Triangle.
    # Second argument is a list with max sum values at each index for the
    # previous row.
    # Third argument is a list being constructed with new max values for given row.

    # a, b are first 2 elements of last_row, max sums, rest is a list with
    # remaining elements.
    [a, b | rest] = last_row
    # Iterates over cur_row elements, summing with max value of last_row
    new_acc(tail, [b] ++ rest, cur_row ++ [head + _max(a, b)])
  end

  defp new_acc([], _, cur_row) do
    # Base case, when cur_row is fully constructed with max sum values.
    cur_row
  end

  # Custom max functions, since we have placeholders atoms
  defp _max(:p, :p), do: 0
  defp _max(:p, a), do: a
  defp _max(a, :p), do: a
  defp _max(a, b), do: max(a, b) 
end
