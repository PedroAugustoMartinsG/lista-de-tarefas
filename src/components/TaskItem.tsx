import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../theme";

type ThemeColors = keyof typeof theme.colors;

interface Task {
  id: number;
  title: string;
  completed: boolean;
  selected?: boolean;
  priority?: ThemeColors;
  type?: string;
  dueDate?: string;
  details?: string;
  relatedTasks?: number[];
  isRecurring?: boolean;
  recurrencePattern?: 'Diariamente' | 'Semanalmente' | 'Mensalmente' | 'Anualmente';
  recurrenceEndDate?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onLongPress: () => void;
  onPressDetails: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete, 
  onLongPress,
  onPressDetails
}) => {
  return (
    <TouchableOpacity 
      onLongPress={onLongPress}
      style={[
        styles.taskContainer,
        task.selected && styles.selectedTask,
        task.priority && { borderColor: theme.colors[task.priority] }
      ]}
    >
      <TouchableOpacity onPress={onToggle} style={styles.checkBox}>
        <Text style={styles.checkIcon}>{task.completed ? "✓" : "○"}</Text>
      </TouchableOpacity>

      <Text style={[styles.taskText, task.completed && styles.completed]}>
        {task.title}
      </Text>

      {task.priority && (
        <View style={[
          styles.priorityTag,
          { backgroundColor: theme.colors[task.priority] }
        ]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      )}

      <TouchableOpacity onPress={onPressDetails} style={styles.detailsButton}>
        <Text style={styles.detailsText}>Detalhes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.m,
    marginVertical: theme.spacing.s,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: theme.radii.m,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTask: {
    borderColor: theme.colors.primary,
  },
  checkBox: {
    marginRight: theme.spacing.m,
  },
  checkIcon: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  taskText: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: theme.colors.completedText,
  },
  deleteButton: {
    marginLeft: theme.spacing.m,
    padding: theme.spacing.s,
  },
  deleteText: {
    color: theme.colors.danger,
    fontSize: 18,
    fontWeight: "bold",
  },
  priorityTag: {
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.radii.s,
    marginLeft: theme.spacing.s,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsButton: {
    marginLeft: theme.spacing.m,
    padding: theme.spacing.s,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radii.s,
  },
  detailsText: {
    color: theme.colors.text,
    fontSize: 12,
  },
});

const handleToggleComplete = (taskId: number) => {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  if (task.completed && task.isRecurring) {
    // Cria uma nova ocorrência da tarefa
    const newDueDate = calculateNextOccurrence(task.dueDate, task.recurrencePattern);
    
    if (!task.recurrenceEndDate || new Date(newDueDate) <= new Date(task.recurrenceEndDate)) {
      const newTask = {
        ...task,
        id: generateNewId(), // Você precisa de uma função para gerar novos IDs
        completed: false,
        dueDate: newDueDate.toISOString()
      };
      
      // Adiciona a nova tarefa à lista
      setTasks([...tasks.filter(t => t.id !== taskId), newTask]);
      return;
    }
  }

  // Alterna o estado de conclusão para tarefas não recorrentes
  setTasks(tasks.map(t => 
    t.id === taskId ? { ...t, completed: !t.completed } : t
  ));
};

function calculateNextOccurrence(dueDate: string | undefined, pattern: string | undefined): Date {
  const date = dueDate ? new Date(dueDate) : new Date();
  const newDate = new Date(date);
  
  switch (pattern) {
    case 'Diariamente':
      newDate.setDate(newDate.getDate() + 1);
      break;
    case 'Semanalmente':
      newDate.setDate(newDate.getDate() + 7);
      break;
    case 'Mensalmente':
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    case 'Anualmente':
      newDate.setFullYear(newDate.getFullYear() + 1);
      break;
    default:
      newDate.setDate(newDate.getDate() + 1);
  }
  
  return newDate;
}

export default TaskItem;
